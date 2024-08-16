const pageConfig = {
  // 您的状态页面的标题
  title: "Uptime 状态页面",
  // 显示在您的状态页面头部的链接，可以设置 `highlight` 为 `true`
  links: [
    { link: 'https://github.com/codedotking', label: 'GitHub' },
    { link: 'https://blog.huala.fun/', label: '博客' },
    // { link: 'mailto:me@lyc8503.net', label: '给我发邮件', highlight: true },
  ],
}

const workerConfig = {
  // 除非状态发生变化，否则每3分钟最多写入KV一次。
  kvWriteCooldownMinutes: 3,
  // 在此处定义所有的监控器
  monitors: [
    {
      // `id` 应该是唯一的，如果 `id` 保持不变，将保留历史记录
      id: 'blog_monitor',
      // `name` 用于状态页面和回调消息
      name: '我的博客网站',
      // `method` 应该是一个有效的HTTP方法
      method: 'GET',
      // `target` 是一个有效的URL
      target: 'https://blog.huala.fun',
      // [可选] `tooltip` 仅用于在状态页面上显示工具提示
      tooltip: 'https://blog.huala.fun',
      statusPageLink: 'https://example.com',
    },
  ],
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // 当任何监控器的状态发生变化时，将调用此回调
      // 在此处编写任何Typescript代码

      // 这将不遵循宽限期设置，并且将在状态变化时立即调用
      // 如果您想实现它，您需要手动处理宽限期
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // 如果任何监控器持续存在故障，此回调将每1分钟被调用一次
      // 在此处编写任何Typescript代码
    },
  },
}

// 别忘了这个，否则编译失败。
export { pageConfig, workerConfig }