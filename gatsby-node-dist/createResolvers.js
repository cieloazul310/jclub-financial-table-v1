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
        },
    };
    createResolvers(resolvers);
}
exports.default = gatsbyCreateResolvers;
