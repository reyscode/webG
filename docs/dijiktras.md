

---

Lets take a simple example to explain the simplicity of *NetworkX* framework.

Lets use Dijkstra’s algorithm to find the shortest path from home to office in a weighted and unweighted network.



Image here



This can be calulated using few lines of code mentioned below.

```bash
import networkx as nx

g = nx.Graph()
g.add_edge('a', 'b', weight=2)
g.add_edge('b', 'c', weight=2)
g.add_edge('c', 'e', weight=3)
g.add_edge('b', 'e', weight=2)
g.add_edge('b', 'd', weight=3)
g.add_edge('d', 'e', weight=3)

print (nx.shortest_path(g, 'a', 'e'))
print (nx.shortest_path(g, 'a', 'e', weight='weight'))
```

The output for the above code will be:

```bash
['a', 'b', 'e']
['a', 'b', 'e']
```

---

