import { test, expect } from '@playwright/test';
import {TodoPage} from "./todopage";

test.beforeEach(async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();
});

test('has title', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.addItem('item 1');
  await expect(todo.todoItemLabel).toBeVisible();
  await page.pause();
});

test('create two items', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.addItem('item 1');
  await todo.addItem('item 2');
  const count = await todo.getItemCount();
  console.log('number of items added = ' + count);
  expect(count).toBe(2);
  await page.pause();
});

test('create an item and select that item', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.addItem('item 1');
  await todo.toggleFirstItem();
  await expect(todo.todoItem).toHaveClass(/completed/);
  await page.pause();
});

test('create an item, select it, and delete it', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.addItem('item 1');
  await todo.toggleFirstItem();
  await todo.deleteFirstItem();
  await page.pause();
});

test('create two items, complete one, clear completed', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.addItem('item 1');
  await todo.toggleFirstItem();
  await todo.addItem('item 2');
  const beforeClear = await todo.getItemCount();
  expect(beforeClear).toBe(2);
  await todo.clickClearCompleted();
  const afterClear = await todo.getItemCount();
  expect(afterClear).toBe(1);
  await page.pause();
});

test('create two items, complete one, filter by completed', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.addItem('item 1');
  await todo.toggleFirstItem();
  await todo.addItem('item 2');
  await todo.filterCompleted();
  const completedCount = await todo.getItemCount();
  expect(completedCount).toBe(1);
  console.log(completedCount);
  await page.pause();
});

test('create three items, complete one and click Active button', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.addItem('item 1');
  await todo.toggleFirstItem();
  await todo.addItem('item 2');
  await todo.addItem('item 23');
  await todo.filterActive()
  const completedCount = await todo.getItemCount();
  expect(completedCount).toBe(2);
  console.log(completedCount);
  await page.pause();
});

test('change the item name', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.addItem('item 1');
  await todo.todoItemLabel.dblclick()
  await page.pause();
});