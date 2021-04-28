// 依赖注入示例代码, 应该算是最简洁实现了
// 有考虑了解后端的可以用看看
// 前端看看也可以增加增加对代码的理解, 主要是工作流那边有一个库就是基于依赖注入实现的, 后面大家可能会需要读这个代码

// 提供者
class Car {
  run(target) {
    console.log('开车到' + target)
  }
}

// 提供者
class Computer {
  code(type) {
    console.log(type + '开发')
  }

  open(programName) {
    console.log('打开' + programName)
  }
}

// 容器, 容器能够提供依赖并且
class Container {
  providers = {}

  instances = {}

  constructor(providers) {
    if (Array.isArray(providers)) {
      providers.forEach(provider => this.addProvider(provider))
    } else {
      this.addProvider(providers)
    }
  }

  addProvider(provider) {
    this.providers[provider.name] = provider
  }

  create(modules) {
    const { instances, providers } = this
    if (Array.isArray(modules)) {
      return modules.map(this.create)
    } else {
      // 此步骤即执行注入操作
      if (modules.$dep) {
        return new modules(
          ...modules.$dep.map(name => {
            if (instances[name]) return instances[name]

            let inst = new providers[name]()
            instances[name] = inst

            return inst
          })
        )
      } else {
        return new modules()
      }
    }
  }
}

// 容器实例, 小型的项目中一个容器实例即可, 甚至都不需要做实例化
const container = new Container([Car, Computer])

// 使用者
class Staff {
  // 告诉容器依赖哪些模块
  static $dep = ['Car', 'Computer']

  // 注入的模块会传入构造函数中, 顺序和依赖顺序一致, 参数名随便
  constructor(car, computer) {
    this.car = car
    this.computer = computer
  }

  // 如果不用依赖注入那么是这样的
  // 缺陷在于每次都实例化了依赖的类
  // constructor() {
  //   this.car = new Car()
  //   this.computer = new Computer()
  // }

  travel() {
    this.car.run('公司')
  }

  work() {
    this.computer.code('前端')
  }

  playLOL() {
    this.computer.open('英雄联盟')
  }
}

const s = container.create(Staff)

const s1 = container.create(Staff)

console.log(s.car === s1.car) // => true, 注入了同一个依赖实例

s.travel()
s.work()
s.playLOL()
