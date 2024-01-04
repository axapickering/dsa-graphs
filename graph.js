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

    return Array.from(seen)
      .map(node => node.value);
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

    return Array.from(seen)
      .map(node => node.value);
  }


  /** find the distance of the shortest path from the start node to the end node */
  distanceOfShortestPath(start, end) {
    // BFS - each time we move a layer - increment a variable
    // return Math.min()

    console.log("start: ", start.value, " end: ", end.value);

    let seen = new Set();
    let queue = [start];
    let distance = 1;

    while (queue.length > 0) {
      let current = queue.shift();

      console.log("current node: ", current.value, " dist: ", distance);

      for (let neighbor of current.adjacent) {
        seen.add(neighbor);
        if (neighbor.value === end.value) {
          return distance;
        }
      }
      console.log("just added to seen, seen:", seen);

      for (let neighbor of current.adjacent) {
        queue.push(neighbor);
      }
      if (!seen.has(current)) {
        distance++;
      }
    }
  }
}


module.exports = { Graph, Node };
