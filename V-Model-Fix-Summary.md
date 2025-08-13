# V-Model 错误修复总结

## 问题描述
在 Vue 2 中，不能在 v-for 循环中直接对迭代变量使用 v-model，因为这会尝试修改一个函数局部变量，无法更新原始数组。

## 错误代码
```vue
<div v-for="(item, index) in appList" :key="item.name">
  <app-card v-model="item" />  <!-- ❌ 错误：无法修改原数组 -->
</div>
```

## 修复方案

### 1. 更新 AppSection.vue 模板
将直接的 v-model 绑定改为显式的 prop 和事件：

**修复前：**
```vue
<app-card v-model="item" />
```

**修复后：**
```vue
<app-card 
  :item="item" 
  @update:item="updateAppItem(index, $event)"
/>
```

### 2. 添加数组更新方法
在 AppSection.vue 的 methods 中添加专门的更新方法：

```javascript
/**
 * @description: Update app item in appList array
 * @param {Number} index
 * @param {Object} newValue
 * @return {*} void
 */
updateAppItem(index, newValue) {
  this.$set(this.appList, index, newValue);
}
```

### 3. 统一处理方式
同时更新了 oldAppList 的处理方式，保持一致性：

```vue
<!-- 统一使用新的绑定方式 -->
<app-card 
  :item="item" 
  @update:item="updateOldAppItem(index, $event)"
/>
```

## 技术要点

### Vue.set 的使用
使用 `this.$set()` 确保 Vue 2 的响应式系统能正确检测到数组变化：
```javascript
this.$set(this.appList, index, newValue);
```

### 为什么不能直接修改
在 v-for 中，`item` 是一个临时变量引用，直接修改它不会影响原数组：
```javascript
// 这样做无效
item.status = 'new-status';  // ❌ 只修改了局部引用

// 正确做法是通过索引更新原数组
this.appList[index] = newItem;  // ✅ 修改原数组
```

## 修复范围
- ✅ appList 循环中的 app-card 组件
- ✅ oldAppList 循环中的 app-card 组件  
- ✅ 添加对应的更新方法
- ✅ 确保响应式更新正常工作

## 验证
- 编译错误已解决
- 组件功能保持不变
- 响应式更新正常工作
- 代码更加符合 Vue 2 最佳实践

这个修复确保了数据能够正确地从子组件传播回父组件，并更新到原始数组中，同时保持了 Vue 的响应式特性。
