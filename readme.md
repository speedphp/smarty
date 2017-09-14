# Smarty lite for node

the light weight Smarty engine for node.

Node版的，简约的Smarty语法。

## Usage

> npm install smarty

## Feature

Grammar of Lite & Common & Widely used: comment, var assign, if-else, foreach, for, include.

支持语法：注释，var赋值，if-else，foreach，for，include

Support Input Parameter, Parameter could be a Function.

支持参数，参数可以是函数表达式。

Support Customize the template path and cache mode.

支持自定义路径，缓存模式等。

Could come to a compile Function expression, Could use in express js.

支持compile编译表达式，支持express。

## Cache Mode

Cache Mode

 - [auto]Cache template file until file modified.
 - [watch]Watch template file change, then refresh the cache.
 - [compile]Cache the compile function, ignore the file stat.
 - [freeze]Cache output by input parameter.

缓存模式

 - [auto]根据文件修改时间对模板进行缓存。
 - [watch]监控文件修改并刷新缓存。
 - [compile]编译缓存，不管文件修改情况。
 - [freeze]根据输入参数进行缓存，在输入参数没有修改之前，缓存不会过期。

## License

ISC