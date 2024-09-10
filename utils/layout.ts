/* eslint-disable no-param-reassign */
const DEFAULT_WIDTH = 200;
const DEFAULT_HEIGHT = 100;

export default function createLayout() {
  let WIDTH = DEFAULT_WIDTH;
  let HEIGHT = DEFAULT_HEIGHT;

  function getNodeOffset(prevNode: any) {
    if (prevNode) {
      return Math.max(...prevNode.leaves().map((l: { x: any; }) => l.x)) + HEIGHT
    }

    return 0;
  }

  function calculateChildrenPosition(root: any) {
    if (root.children) {
      root.children.forEach((node: any, i: any) => {
        const nodeOffset = getNodeOffset(root.children[i - 1]);
        const offset = Math.max(root.x, nodeOffset)
        node.x = node.children ? offset : root.x + i * HEIGHT

        node.y = node.depth * WIDTH / 2;

        calculateChildrenPosition(node);
      });
    }
  }

  function layout(root: any) {
    root.x = 0;
    root.y = 0;
    calculateChildrenPosition(root);
    return root;
  }

  function nodeSize() {
    WIDTH = 55;
    HEIGHT = 20;
  }

  layout.nodeSize = nodeSize;

  return layout;
}
