# Smarty for node

Support php syntax node of smarty template engine.

## Usage

> npm install smarty

## TODO


$smarty.request
$smarty.response

注释  忽略
$变量  过滤输出
. 和方框 默认支持
$变量（函数表达式支持函数） nofilter
var xx = xx
if else else if 
foreach
foreach@变量
for-in
break
continue
include

markdown .md支持，<{markdown}><{/markdown}>


配置：（tpl_xxx的参数）

路径

增加自定义过滤器：名称：函数表达式变量
增加自定义函数：名称：函数表达式变量

是否自动HTML转码：默认否

缓存模式：
 - [auto]检查文件修改时间如有修改则重新编译，但执行输出
 - [compile]读取并编译后内存缓存，但执行输出
 - [freeze]记录输入参数，没有修改就直接返回缓存html
