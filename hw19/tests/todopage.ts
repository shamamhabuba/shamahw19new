import { Page, Locator } from '@playwright/test';

export class TodoPage
{
    readonly page: Page;
    readonly textInput: Locator;
    readonly todoItemLabel: Locator;
    readonly todoItemToggle: Locator;
    readonly todoItem: Locator;
    readonly todoItemButton: Locator;
    readonly clearCompletedButton: Locator;
    readonly completedLink: Locator;
    readonly activeLink: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.textInput = page.getByTestId('text-input');
        this.todoItemLabel = page.getByTestId('todo-item-label');
        this.todoItemToggle = page.getByTestId('todo-item-toggle');
        this.todoItem = page.getByTestId('todo-item');
        this.todoItemButton = page.getByTestId('todo-item-button');
        this.clearCompletedButton = page.getByText('Clear completed');
        this.completedLink = page.getByRole('link', { name: 'Completed' });
        this.activeLink = page.getByRole('link', { name: 'Active' });
    }

    async goto()
    {
        await this.page.goto('https://todo-app.tallinn-learning.ee/');
    }

    async addItem(text: string)
    {
        await this.textInput.fill(text);
        await this.textInput.press('Enter');
    }

    async toggleFirstItem()
    {
        await this.todoItemToggle.first().click();
    }

    async deleteFirstItem()
    {
        await this.todoItemLabel.first().hover();
        await this.todoItemButton.first().click();
    }

    async clickClearCompleted()
    {
        await this.clearCompletedButton.click();
    }

    async filterCompleted()
    {
        await this.completedLink.click();
    }

    async getItemCount()
    {
        return await this.todoItemLabel.count();
    }
    async filterActive()
    {
        await this.activeLink.click();
    }
}