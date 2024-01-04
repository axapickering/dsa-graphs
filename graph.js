/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addNode(node) {
    this.nodes.add(node);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addNodes(nodeArray) {
    for (let node of nodeArray) {
      this.addNode(node);
    }
  }

  /** add edge between nodes n1,n2 */
  addEdge(n1, n2) {
    n1.adjacent.add(n2);
    n2.adjacent.add(n1);
  }

  /** remove edge between nodes n1,n2 */
  removeEdge(n1, n2) {
    n1.adjacent.delete(n2);
    n2.adjacent.delete(n1);
  }

  /** remove node from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that node
   */
  removeNode(node) {
    this.nodes.delete(node);
    for (let otherNode of this.nodes) {
      this.removeEdge(node, otherNode);
    }
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    let seen = new Set([start]);

    function _depthFirstSearch(current) {
      for (let neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          seen.add(neighbor);
          _depthFirstSearch(neighbor);
        }
      }
    }
    _depthFirstSearch(start);

    const vals = Array.from(seen);
    const result = vals.map(node => node.value);

    return result;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let seen = new Set();
    const queue = [start];

    while (queue.length) {
      let current = queue.shift();

      for (let neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          seen.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    const vals = Array.from(seen);
    const result = vals.map(node => node.value);
    return result;

  }

  /** find the distance of the shortest path from the start node to the end node */
  distanceOfShortestPath(start, end) { }
}

module.exports = { Graph, Node };
