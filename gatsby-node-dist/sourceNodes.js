"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const yaml = require("yaml");
async function souceNodes({ actions, createNodeId, createContentDigest }) {
    const { createNode } = actions;
    const clubs = yaml.parse(fs.readFileSync(path.resolve('./data/frames/clubs.yml'), 'utf-8'));
    clubs.forEach((data) => {
        const href = `/club/${data.slug}/`;
        const nodeId = createNodeId(`club-${data.slug}`);
        const nodeContent = JSON.stringify({ ...data, href });
        const nodeMeta = {
            id: nodeId,
            parent: null,
            children: [],
            internal: {
                type: `Club`,
                mediaType: `text/html`,
                content: nodeContent,
                contentDigest: createContentDigest({ ...data, href }),
            },
        };
        const node = { ...data, href, ...nodeMeta };
        createNode(node);
    });
    const years = yaml.parse(fs.readFileSync(path.resolve('./data/frames/years.yml'), 'utf-8'));
    years.forEach((data) => {
        const href = `/year/${data.year}/`;
        const nodeId = createNodeId(`year-${data.year}`);
        const nodeContent = JSON.stringify({ ...data, href });
        const nodeMeta = {
            id: nodeId,
            parent: null,
            children: [],
            internal: {
                type: `Year`,
                mediaType: `text/html`,
                content: nodeContent,
                contentDigest: createContentDigest({ ...data, href }),
            },
        };
        const node = { ...data, href, ...nodeMeta };
        createNode(node);
    });
}
exports.default = souceNodes;
