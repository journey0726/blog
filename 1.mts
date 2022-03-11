
type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never
type Partical2<T> = {
    [K in keyof T]?: T[K]
} 
type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
type MutableDeep<T> = {
    -readonly [K in keyof T]: T[K] extends object ? MutableDeep<T[K]> : T[K]
}
type FuncTypeKeys<T> = {
    [K in keyof T]-?: T[K] extends Function ? K : never
}[keyof T]

type RequireKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K   //这里面的Pick<T, K> 不能换成T[K]
}[keyof T]


type OptionalKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[keyof T]

type PickedByValueType<T, ValueType> = Pick<
    T,
    {[K in keyof T]-?: T[K] extends ValueType ? K : never}[keyof T]
>
type ReturnType1<T> = T extends (...arg: any[]) => infer R ? R : any  
type Exclude1<T, K> = T extends K ? never : K
function isNumber (val: unknown): val is number{
    return typeof val === 'number'
}
type ReadOnly2<T> = {
    readonly [K in keyof T]: T[K]
}
type Mutable<T> = {
    -readonly [K in keyof T]: T[K]
}
type Omit2<T, K> = Pick<
    T,
    Exclude<keyof T, K>
>
type NonNullable2<T> = T extends null | undefined ? never : T
type Record2<T extends keyof any, K extends keyof T> = {
    [P in T]: K
}

type getParams<T> = T extends (...params: any) => infer U ?  U : never
type Pop<T> = T extends [... infer Rest, infer R] ? Rest : never
type getReturnType<T> =  T extends () => infer R ? R : never


//把字符串重复n次
type RepeatStr<Str extends string, Count extends number, Arr extends Str[] = [], ResStr extends string = ''>
 = 
Arr['length'] extends Count ? ResStr : RepeatStr<Str, Count, [Str, ...Arr], `${Str}${ResStr}`>

//反转字符串
type ReverseStr<Str extends string, Result extends string = ''> = 
Str extends `${infer First}${infer Rest}` ? ReverseStr<Rest, `${First}${Result}`> : Result


type ParseQueryString<Str extends string> = Str extends `${infer T}&${infer Rest}` ? MergeParams<parseParams<T>, ParseQueryString<Rest>> : parseParams<Str>


//将url的query参数解析成对象形式
type MergeParams<One extends object, Other extends object> = {
    [key in keyof One | keyof Other] : key extends keyof One ? 
        key extends keyof Other ? MergeValue<One[key], Other[key]> : One[key]
    : key extends keyof Other ? Other[key] : never
}

type MergeValue<One, Other> = One extends Other ? One : Other extends unknown[] ? [One, ...Other] : [One, Other] 

type parseParams<Str> = Str extends `${infer A}=${infer B}` ? {[key in A] : B} : {}

type ParseQueryStringResult = ParseQueryString<'a=1&a=2&b=2&c=3'>;

//拼接两个字符串
type Concat<A extends string, B extends string> = `${A}${B}`


type Push<array extends unknown[], Item> = [...array, Item]
//分割字符串
type SplitStr<Str extends string, split extends string = '', Arr extends string[] = []> = 
Str extends `${infer S}${split}${infer Rest}` ? 
SplitStr<Rest, split, Push<Arr, S>> : Str extends string ? Str extends "" ? Arr : Push<Arr, Str> : never

//获取字符串长度，TS 中元组的长度可以通过['length'] 获取
type getStrLength<Str extends string, Count extends number = 0> = SplitStr<Str>['length']

