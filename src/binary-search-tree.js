const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
      return this._root;
  }

  add (data) {
      this._root = addWithin(this._root, data);

      function addWithin(node, data) {
          if (!node) {
              return new Node(data);
          }

          if (node.data === data) {
              return node;
          }

          data < node.data ? node.left = addWithin(node.left, data) : node.right = addWithin(node.right, data);
          return node;
      }
  }

  has(data) {
      return search(this._root, data);

      function search(node, data) {
          if (!node) {
              return false;
          }

          if (node.data === data) {
              return true;
          }

          return data < node.data ? search(node.left, data) : search(node.right, data);
      }
  }

  find(data) {
      return goGetIt(this._root, data);

      function goGetIt(node, data) {
          if (!node) {
              return null;
          }

          if (node.data === data) {
              return node;
          }

          return data < node.data ? goGetIt(node.left, data) : goGetIt(node.right, data);
      }
  }

  remove(data) {
      this._root = removeNode(this._root, data);

      function removeNode(node, data) {
          if (!node) {
              return null;
          }

          if (data < node.data) {
              node.left = removeNode(node.left, data);
              return node;
          } else if (data > node.data) {
              node.right = removeNode(node.right, data);
              return node;
          } else {
              if (!node.left && !node.right) {
                  return null;
              }

              if (!node.left) {
                  node = node.right;
                  return node;
              }

              if (!node.right) {
                  node = node.left;
                  return node;
              }

              let maxLeft = node.left;
              while (maxLeft.right) {
                  maxLeft = maxLeft.right;
              }

              node.data = maxLeft.data;
              node.left = removeNode(node.left, maxLeft.data);

              return node;
          }
      }
  }

  min() {
      if (!this._root) {
          return null;
      }

      let node = this._root;

      while (node.left) {
          node = node.left;
      }

      return node.data;
  }

  max() {
      if (!this._root) {
          return null;
      }

      let node = this._root;

      while (node.right) {
          node = node.right;
      }

      return node.data;
  }
}

module.exports = {
  BinarySearchTree
};