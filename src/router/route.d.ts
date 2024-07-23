// 定义一个包含 require.context 的 RequireInterface
interface RequireContext {
  context: (path: string, recursive?: boolean, regexp?: RegExp) => any
}

// 将 NodeRequire 与 RequireContext 合并
declare var require: NodeRequire & RequireContext
