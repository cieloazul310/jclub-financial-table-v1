"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const yaml = require("yaml");
async function gatsbyCreateResolvers({ createResolvers }) {
    const resolvers = {
        Query: {
            dictionary: {
                type: `Dict!`,
                resolve: () => {
                    const dict = yaml.parse(fs.readFileSync(path.resolve('./data/frames/dict.yml'), 'utf8'));
                    return dict;
                },
            },
            statistics: {
                type: `Statistics`,
                resolve: async (source, args, context) => {
                    const { entries } = await context.nodeModel.findAll({
                        type: `Year`,
                        query: {
                            sort: { field: [`year`], order: [`ASC`] },
                        },
                    });
                    const items = Array.from(entries);
                    const j1 = items.map(({ year, stats }) => ({
                        year,
                        category: 'J1',
                        ...stats.J1,
                    }));
                    const j2 = items.map(({ year, stats }) => ({
                        year,
                        category: 'J2',
                        ...stats.J2,
                    }));
                    const j3 = items
                        .filter(({ categories }) => categories.includes('J3'))
                        .map(({ year, stats }) => ({
                        year,
                        category: 'J3',
                        ...stats.J3,
                    }));
                    return { j1, j2, j3 };
                },
            },
        },
    };
    createResolvers(resolvers);
}
exports.default = gatsbyCreateResolvers;
