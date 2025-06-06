# A.总结
## 命题公式
* 只有p才q；后推逻辑： q->p
* 可满足式|矛盾式
  * 重言式属于可满足式

* 如P，Q $P \rightarrow Q$
* P, 除非Q: $P \rightarrow \neg Q$
* 仅/只有 P，Q: $ Q\rightarrow P$ 后推

* $(A \lor D) \land (C \lor D) = (A\land C) \lor (B \land D)$
* 大小项：大河一非，小溪零非
## 集合
* $A - B = A \cap \complement B$
* 笛卡尔集对集合的交并有分配率
## 关系
* 等价：等价关系中两个元素有关系,符号 `~`
* 可比：偏序集上两个元素有关系,符号 `<`
* 关系图是有箭头的P92
---

* 关系矩阵的布尔积和关系的符合运算对应

* 关系：逆运算和交并没有德摩根定律
* 关系：补运算和交并满足德摩根定律
---
* 偏序集： 自反、 反对称、传递
* 全序关系：偏序关系，任意x，y都可比
* 等价关系： 自反，对称传递你 

---

## 群
* 半群：满足封闭性，可结合的的二元运算上的代数系统；设 $V=<S,\circ>$ 是代数系统，$\circ$ 为二元运算， 如果 $\circ$ 运算是 封闭的、可结合的
* 群：封闭的、可结合的，存在单位元，且每个元素都有逆元
* 阿贝尔群：二元运算是可交换的
## 格
* 格：偏序集、任意两个元素有最小上界和最大上界（上下确界）；满足交换律、结合律、幂等律格吸收率
* 有界格：存在全上界和全下界
* 有补格：有界格、每个元素都存在补元
* 分配格： 格的运算满足分配率（钻石格和五角格不是分配格的同构）
* 布尔代数：有补格、分配格

* 等价关系：自反的、对称的和传递
* 拟序关系：反自反，传递

### 总结

| 关系     | 自反  | 反自反 | 对称  | 反对称  | 传递  |        可比         |        记法         |
| -------- | :---: | :----: | :---: | :-----: | :---: | :-----------------: | :-----------------: |
| 等价关系 |   ✅   |        |   ✅   |         |   ✅   |                     |                     |
| 偏序关系 |   ✅   |        |       |    ✅    |   ✅   |                     | $<A,\preccurlyeq >$ |
| 全序关系 |   ✅   |        |       |    ✅    |   ✅   | $\forall x,y \in A$ |                     |
| 拟序关系 |       |   ✅    |       | ✅(推论) |   ✅   |                     |      $<A,\lt>$      |

### 二元运算总结

| 集合     | 运算     | 单位元      | 零元        | 逆元             |
| -------- | -------- | ----------- | ----------- | ---------------- |
| Z,Q,R    | 普通加法 | 0           | 无          | -x               |
| Z,Q,R    | 普通乘法 | 1           | 0           | $x^{-1}$         |
| $M_n(R)$ | 矩阵加法 | n阶全0矩阵  | 无          | -X               |
| $M_n(R)$ | 矩阵乘法 | n阶单位矩阵 | n阶全0矩阵  | $X^{-1}$         |
| P(B)     | 并       | $\emptyset$ | B           | 空集的逆元为空集 |
| P(B)     | 交       | B           | $\emptyset$ | B的逆元为B       |
| P(B)     | 对称差   | $\emptyset$ | 无          | X的逆元为X       |

## 连通平面图
一个图G能画在平面S上，是的G的边仅在端点处相交，则称G可以嵌入平面，G为可平面图

---
* 平面连通图，面的次数等于其边数的两倍
### 欧拉公式
* 面 + 点 = 边 + 2
* F +V = E +2

!!! note
    G 为连通平面图，7个顶点，5个面，则边 = 10

---

* G是一个有 v 个顶点 m 调边的连通简单平面图，若 $v\ge 3$，则 $m \le 3v-6$

## 二叉树
完全二叉树有n个节点，则 有(n+1)/2个叶节点



## 8个概念
设 $<A,\preccurlyeq>$ 为偏序集，$B \subseteq A, y \in B$

* 若$\forall x(x\in B \rightarrow y \preccurlyeq x)$成立，则称 y 为 B 的最小元
* 若$\forall x(x\in B \rightarrow x \preccurlyeq y)$成立，则称 y 为 B 的最大元
* 若$\neg \exists x(x\in B \land x \preccurlyeq y)$成立，则称 y 为 B 的极小元
* 若$\neg \exists x(x\in B \land y \preccurlyeq x)$成立，则称 y 为 B 的极大元

!!! note 
    这四个特殊元素都是在 ==子集B== 的范围内规定的

设 $<A,\preccurlyeq>$ 为偏序集，$B \subseteq A, y \in A$

* 若$\forall x(x\in B \rightarrow x \preccurlyeq y)$成立，则称 y 为 B 的上界
* 若$\forall x(x\in B \rightarrow y \preccurlyeq x)$成立，则称 y 为 B 的下界
* 令 C={ y | y为B的上界 }，则称C的最小元为 B 的最小上界、上确界
* 令 D={ y | y为B的下界 }，则称C的最小元为 B 的最大上界、下确界

![alt text](img/cd7ba8e34e2a8a95fb1b80072ef91cf3f7e10ab1.jpg)