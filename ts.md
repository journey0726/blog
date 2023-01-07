## 为什么要使用TypeScript
  __[2021年JavaScript 生态的发展](https://2021.stateofjs.com/zh-Hans/other-tools)__

  `TypeScript` 是一门静态类型、弱类型的语言。 它的设计目标之一是让你在 `TypeScript` 中安全、轻松地使用现有的 `JavaScript` 库。
  - __ts优势__：
    - `类型检测`：能让一些错误在开发阶段就能暴露出来。
    - `语法提示`：IDE会根据你当前的上下文，把你能用的类、变量、方法和关键字都给你提示出来。
    - `重构`：IDE会帮你自动引用这个变量或者调用这个方法地方的代码自动帮你修改掉，这个特性一个是会提高你的开发效率，另一个是可以很容易的提升你的代码质量。


## 初始化一个TypeScript项目
  `tsc`  ts的编译器, 用于将ts转成js。
  
  全局安装tsc   `npm i -g typescript` 或者 `yarn add typescript global` 。

  命令: `tsc --init` 。

  生成 `tsconfig.json` 文件。

## TypeScript的几种文件
 - .ts
 - .tsx
 - .d.ts
    - 里面不允许有任何函数的实现.
    - 顶层作用域里面只能出现 `declare`, `import`, `export`, `interface` 以及 `三斜线指令`.
  
## lib.d.ts

  安装 `TypeScript` 时，会顺带安装一个 `lib.d.ts` 声明文件。这个文件包含 `JavaScript` 运行时以及 DOM 中存在各种常见的环境声明。

## 声明空间
- __类型声明空间__
  
  > 包括能够当作注解的内容，可以理解成对类型进行编程。
  ```ts
    interface A {}
    type A = {}
  ```
- __变量声明空间__
  > 和js的写法一样，声明一些变量。
  ```ts
    const A = 123
    class A {}
  ```

## TypeScript的类型系统
  ### 类型推断：
    如果没有明确的指定类型，那么 `TypeScript` 会依照类型推论（Type Inference）的规则推断出一个类型。
  ### 类型：
  - 原始类型: 
      `number`, `string`, `boolean`, `symbol`, `bigint`, `null`, `undefined。`
      <br>
      __补充__: 
       > 类型名称`String`, `Number` 和 `Boolean` 也是合法的, 但是它们引入了一些特殊的内置类型，这些类型很少在代码中出现，所以请始终使用 `string`, `number`, `boolean`。
  - 对象类型: 数组, 对象(`Object`, `object`, `{}`), 函数等。
      <br>
  - ts新增类型
      `any`, `unknow`
      `void`(表示没有任何返回值的函数)
      `enum`
      `元组类型`
      `接口`
      `readonly`(与 `const` 的不同)
      `类型别名`
      `联合类型`
      `交叉类型`
      `never`
      `泛型`(是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性)
      `private`, `protected`, `public`
    <br>
  ### 注意点：
  - __any 和 unknow__
    `any` 和 `unknow` 都是TS中的顶级类型，而 `unknown` 类型相较于 `any` 更加严格，`any` 相当于放弃了类型检查。
    <br>
  - __type 和 interface 区别__
    1. `interface` 只能声明对象类型，`type` 可以声明任何类型，包括基础类型，联合类型，交叉类型。
    2. `interface` 可以使用 `extends` 来扩展，`type` 没有扩展功能，只能交叉或者合并。
    3. 多次声明相同名称的 `interface` 会声明合并，而定义两个同名的 `type` 会出现异常。
    <br>
  - __never 和 void__
    never表示不应该出现的类型，比如一个从来不会有返回值的函数(while(true))，或者一个总是会抛出错误的函数。
    void表示没有任何类型，比如当一个函数返回空值时，它的返回值为 void 类型。
     <br>
  - __Object, object, {} 类型之间的区别__
    除了所有的原始类型外，所有其他类型均可以用 `object` 来标注类型,
    而 `Object` 包括原始值,既:
    ```ts
    const obj1: Object = 123 // ok
    const obj2: object = 123 // error
    ```
    空类型 `{}` 描述一个没有成员的对象，当你试图访问这样一个对象的任意属性时，TypeScript 会产生一个编译时错误，
    但是你可以访问 `Object` 类型上定义的所有方法和属性。
    

## 模块
  - __全局模块__
    在默认情况下，当你开始在一个新的ts文件中写下代码时，它处于全局命名空间中,如在 `foo.ts` 中。
    ```ts
      const foo = 123;
    ```
    此时创建了一个新的文件 `bar.ts`。
    ```ts
      const bar = foo
    ```
  - __文件模块__
    如果在你的 `TypeScript` 文件的根级别位置含有 `import` 或者 `export`，那么它会在这个文件中创建一个本地的作用域。
    ```ts
    // foo.ts
    export const foo = 123
    ```
    这个时候如果想在 `bar.ts` 中使用来自 `foo.ts` 的内容，需要显示的导入。
    ```ts
    // bar.ts
    import { foo } from './foo';
    const bar = foo;
    ```



## 环境声明
  可以通过 `declare` 关键字来告诉 `TypeScript`，你正在试图表述一个其他地方已经存在的代码。
  ```ts
  foo = 123  // error
  ```
  ```ts
  declare let foo: any;
  foo = 123; // ok
  ```
  比如在 `nodejs` 中使用 `process`,
  ```ts
  declare let process: any;
  ```
  __声明语句：__
  `declare var` 声明全局变量

  `declare function` 声明全局方法

  `declare class` 声明全局类

  `declare enum` 声明全局枚举类型

  `declare namespace` 声明（含有子属性的）全局对象

  `interface` 和 `type` 声明全局类型

  `export` 导出变量

  `export namespace` 导出（含有子属性的）对象

  `export default` ES6 默认导出

  `export = commonjs` 导出模块

  `export as namespace` UMD 库声明全局变量, 只能在模块文件里面使用

  `declare global` 扩展全局变量

  `declare module` 扩展模块

  `/// <reference />` 三斜线指令
  <br>

  __补充__: `三斜线指令` 和 `import`的区别
  > 历史遗留问题，`三斜线指令`出现的时候 `ES6` 还没出来。`三斜线指令`不会将一个全局文件变成模块文件，而 `import` 会。如果你需要一个在一个全局文件 b 里用另一个文件 c 里的变量，就可以用三斜线指令，因为用 `import` 会把 b 变成一个模块文件。

## 模块
  - __@types__
  使用第三方的模块：
  如果这个模块本身不包含声明文件，但是社区提供了，通过安装 `@types` 来添加声明文件:
  ```
  npm i @types/jquery --save-dev
  ```

  - __全局声明__
  在全局模块中添加:
  ```ts
  // global.d.ts
  declare module 'xxx' {}
  ```
  - __扩展模块声明__
  在文件模块中添加:
  ```ts
  // module.d.ts
  import _ from 'lodash'
  declare module 'lodash' {}
  ```

  - __使用模块__
   推荐使用ES模块的语法。
   ```ts
   import * as React from 'react'
   import { createApp }  from 'vue'
   export { xxx }
   export default xxx
   ```

  - __模块路径__
    - 相对模块路径，依照相对路径来就行了。
        ```ts
        import * as foo from './foo'
        ```
    - 动态查找，模块解析将会模仿 `Node模块解析策略`。
        ```ts
        import * as React from 'react'
        ```

## 函数
- __声明__
  声明有两种方式：
  ```ts
  type T1 = {
    (arg: string): string
  }

  type T2 = (arg: string) => string
  ```
      
- __可选参数和默认参数，剩余参数__
  ```ts
  // 可选参数
  function foo(bar: number, bas?: string) {
  
  }

  foo(123);
  foo(123, 'hello');

  //默认参数
  function foo(bar: number, bas: string = 'hello') {

  }

  foo(123);
  foo(123, 'world'); 

  // 剩余参数
  type Args = number | string
  function foo(...args: Args[]) {
    
  }

  foo(123); 
  foo(123, 'world'); 
  ```
- __重载__
  重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。举一个加法的例子。

## 类型断言
`TypeScript` 允许你覆盖它的推断，并且能以你任何你想要的方式分析它，这种机制被称为「类型断言」。`TypeScript` 类型断言用来告诉编译器你比它更了解这个类型，并且它不应该再发出错误。
- __as__
- __<>__

