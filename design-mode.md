## 建造者模式
  将一个复杂的对象分解成多个相对简单的部分，然后根据不同的需要分别创建他们，最后构建成复杂对象。

  ```ts
  class Car {
    constructor(
        public engine: string,
        public chassis: string, 
        public body: string
    ) {}
  }

class CarBuilder {
  engine!: string; // 引擎
  chassis!: string; // 底盘
  body!: string; // 车身

  addChassis(chassis: string) {
    this.chassis = chassis;
    return this;
  }

  addEngine(engine: string) {
    this.engine = engine;
    return this;
  }

  addBody(body: string) {
    this.body = body;
    return this;
  }

  build() {
    return new Car(this.engine, this.chassis, this.body);
  }
}
```
使用示例
```ts
const car = new CarBuilder()
  .addEngine('v12')
  .addBody('镁合金')
  .addChassis('复合材料')
  .build();
```

## 工厂模式

- ### 简单工厂模式
- ### 工厂方法模式
- ### 抽象工厂模式
  

## 单例模式
有些对象我们只需要一个，单例模式保证一个类仅有一个实例。
```ts
class Singleton {
  // 定义私有的静态属性，来保存对象实例
  private static singleton: Singleton;
  private constructor() {}

  // 提供一个静态的方法来获取对象实例
  public static getInstance(): Singleton {
    if (!Singleton.singleton) {
      Singleton.singleton = new Singleton();
    }
    return Singleton.singleton;
  }
}
```
使用示例
```ts
let instance1 = Singleton.getInstance();
let instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true
```

## 适配器模式
用来解决两个软件实体间接口不兼容的问题。
```ts
interface Logger {
  info(message: string): Promise<void>;
}

interface CloudLogger {
  sendToServer(message: string, type: string): Promise<void>;
}

class AliLogger implements CloudLogger {
  public async sendToServer(message: string, type: string): Promise<void> {
    console.info(message);
    console.info('This Message was saved with AliLogger');
  }
}

class CloudLoggerAdapter implements Logger {
  protected cloudLogger: CloudLogger;

  constructor (cloudLogger: CloudLogger) {
    this.cloudLogger = cloudLogger;
  }

  public async info(message: string): Promise<void> {
    await this.cloudLogger.sendToServer(message, 'info');
  }
}

class NotificationService {
  protected logger: Logger;
  
  constructor (logger: Logger) {    
    this.logger = logger;
  }

  public async send(message: string): Promise<void> {
    await this.logger.info(`Notification sended: ${message}`);
  }
}
```
使用示例
```ts
(async () => {
  const aliLogger = new AliLogger();
  const cloudLoggerAdapter = new CloudLoggerAdapter(aliLogger);
  const notificationService = new NotificationService(cloudLoggerAdapter);
  await notificationService.send('Hello semlinker, To Cloud');
})();
```

## 观察者模式 & 发布订阅者模式

## 策略模式
定义一系列算法，把他们封装起来，并且他们可以互相替换。
比如说在登录页面中，可以使用不同的登录方式
```ts
interface Strategy {
  authenticate(...args: any): any;
}

class Authenticator {
  strategy: any;
  constructor() {
    this.strategy = null;
  }

  setStrategy(strategy: any) {
    this.strategy = strategy;
  }

  authenticate(...args: any) {
    if (!this.strategy) {
      console.log('尚未设置认证策略');
      return;
    }
    return this.strategy.authenticate(...args);
  }
}

class WechatStrategy implements Strategy {
  authenticate(wechatToken: string) {
    if (wechatToken !== '123') {
      console.log('无效的微信用户');
      return;
    }
    console.log('微信认证成功');
  }
}

class LocalStrategy implements Strategy {
  authenticate(username: string, password: string) {
    if (username !== 'abao' && password !== '123') {
      console.log('账号或密码错误');
      return;
    }
    console.log('账号和密码认证成功');
  }
}
```
使用示例
```ts
const auth = new Authenticator();

auth.setStrategy(new WechatStrategy());
auth.authenticate('123456');

auth.setStrategy(new LocalStrategy());
auth.authenticate('abao', '123');
```

## 职责链模式
使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系。
对于职责链来说，一种常见的应用场景是**中间件**。

