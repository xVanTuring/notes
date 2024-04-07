# B-Tree 和 B+Tree
## B-Tree
> B-tree is a special type of self-balancing search tree in which each node can contain more than one key and can have more than two children. It is a generalized form of the  [binary search tree](https://www.programiz.com/dsa/binary-search-tree).
### 优点
1. 节点可以保存多个值，从而降低树的高度
2. B树可以在内部节点同时存储键和值，因此，把频繁访问的数据放在靠近根节点的地方将会大大提高热点数据的查询效率。这种特性使得B树在特定数据重复多次查询的场景中更加高效。
### B-Tree Properties
1. 对于B-Tree的每个节点 (node) `x`，包含在在其中的`key`按增序排列
2. 每个 `node`	包含一个布尔值	`x.leaf`，表面其是否为一个叶子`leaf`
3. 设`n`为树的`order`(阶)，则其内部的每个子树可以最多包含 `n-1`个值，
4. 根节点以外的节点可以有最多 `n`个子节点和最少`n/2`个子节点
5. 所有的叶子的深度都相同（平衡）
6. 根节点最少有 2 个子数，最少 1 个 值
7. If n ≥ 1, then for any n-key B-tree of height h and minimum degree `t ≥ 2`, `h ≥ logt  (n+1)/2`

## B+树
1. 所有关键字存储在叶子节点出现,内部节点(非叶子节点并不存储真正的 data)。
2. 为所有叶子结点增加了一个链指针
## 区别
1. B+树内节点不存储数据，所有data存储在叶节点导致查询时间复杂度固定为 log n。而B-树查询时间复杂度不固定，与 key 在树中的位置有关，最好为O(1)。
2. B+树叶节点两两相连可大大增加区间访问性，可使用在范围查询等，而B-树每个节点 key 和 data 在一起，则无法区间查找。
3. B+树更适合外部存储。由于内节点无 data 域，每个节点能索引的范围更大更精确

[为什么使用B+树](https://img-blog.csdnimg.cn/576f26260e554b9bbb72df4576d76071.png?x-oss-process%3Dimage%2Fwatermark%2Ctype_ZHJvaWRzYW5zZmFsbGJhY2s%2Cshadow_50%2Ctext_Q1NETiBA5qOu5piO5biu5aSn5LqO6buR6JmO5biu%2Csize_20%2Ccolor_FFFFFF%2Ct_70%2Cg_se%2Cx_16)

---
ref: \
https://www.cnblogs.com/qixinbo/p/11048269.html \
https://www.programiz.com/dsa/b-tree \
https://www.cnblogs.com/xiazhenbin/p/14348442.html \
https://blog.csdn.net/qq_44918090/article/details/120278339 \
