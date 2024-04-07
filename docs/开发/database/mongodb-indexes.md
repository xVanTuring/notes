# 索引
## MongoDB 索引
> MongoDB中的索引是通过B树来实现的。B树是一种多路平衡查找树，它的每个节点可以存储多个关键字，并且每个节点的子节点数目可以在一个范围内变化。B树的特点是高度平衡，每个节点的子树高度相差不超过1，因此它的查找效率非常高。

## B-Tree
> B-tree is a special type of self-balancing search tree in which each node can contain more than one key and can have more than two children. It is a generalized form of the  [binary search tree](https://www.programiz.com/dsa/binary-search-tree).

More in `[AdvancedStructure/B-Tree](./AdvancedStructure/B-Tree_B+Tree.md)`

B树和B+树都是一种多路平衡查找树，它们的主要区别在于节点的结构和存储方式。

B树的每个节点可以存储多个关键字和指向子节点的指针，它的每个节点都可以作为一个磁盘块来存储。B树的查找过程和二叉查找树类似，但是它的每个节点可以存储多个关键字，因此它的查找效率比二叉查找树更高。

B+树是在B树的基础上发展而来的一种树形结构，它的每个节点只存储关键字和指向子节点的指针，而不存储数据。B+树的叶子节点存储了所有的关键字和对应的数据，它们之间通过指针相连，形成一个有序链表。B+树的查找过程和B树类似，但是它的叶子节点形成了一个有序链表，因此可以很方便地进行范围查询和排序操作。

B+树相对于B树的优点在于：

B+树的内部节点不存储数据，因此可以存储更多的关键字，减少了树的高度，提高了查询效率。

B+树的叶子节点形成了一个有序链表，可以很方便地进行范围查询和排序操作。

B+树的叶子节点只存储数据，因此可以存储更多的数据，提高了存储效率。

因此，B+树通常比B树更适合用于数据库索引的实现
---
Ref:
https://www.programiz.com/dsa/b-tree
