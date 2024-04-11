# NTFS 挂载

## 简单挂载
``` fstab
/dev/sdb1	/share	ntfs	defaults,dmask=0010,fmask=0010,windows_names		0 0
```

主要的配置是 `dmask` 和 `fmask`, 这两个 mask(掩码) 用来屏蔽权限. `dmask` 用来配置文件夹, `fmask`配置文件.

和常用的rwx权限关系是`mask` = `0777` - `期望的权限`. 需要注意的是文件夹需要有 `x` 权限才能正常打开.

所以上面两个对应的最终权限就是 `0767`, `0767`.

> 除了 `dmask` 和 `fmask` 之外还有个 `umask`, 可以同时为文件夹和文件设置掩码.
> 同时我们也可以配置 `gid`和`uid`给文件和文件夹配置所有权(owner)

`windows_names` 主要是避免在NTFS上创建Linux支持, 但是Windows不支持的文件名.

## ntfs-3g vs ntfs(3)
早期linux使用的是 `ntfs-3g`来挂载 NTFS 格式的磁盘, 但是这个是使用FUSE来完成挂载的. 内核`5.15` 之后合并了
一个'新的'ntfs内核驱动, 这个驱动是由`Paragon` 贡献的.

---
参考: 

[SO: "dmask" and "fmask" mount options](https://askubuntu.com/questions/429848/dmask-and-fmask-mount-options)

[SO: Execute vs Read bit. How do directory permissions in Linux work?](https://unix.stackexchange.com/questions/21251/execute-vs-read-bit-how-do-directory-permissions-in-linux-work)

[AW: NTFS](https://wiki.archlinux.org/title/NTFS)

[AW: NTFS-3G](https://wiki.archlinux.org/title/NTFS-3G)

[K: NTFS3](https://docs.kernel.org/filesystems/ntfs3.html)

[P: ntfs3-driver-faq](https://www.paragon-software.com/home/ntfs3-driver-faq/)