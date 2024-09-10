import treeLayout from "./layout";

type TreeNode = any;

interface Props {
  root: TreeNode;
  nodeSize?: [number, number];
  children: (tree: TreeNode) => any;
}

export default function Tree({ root, children, nodeSize }: Props) {
  const layout = treeLayout();
  if (nodeSize) layout.nodeSize();

  const data = layout(root);

  return children(data);
}
