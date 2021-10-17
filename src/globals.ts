import {Category, CategoryConfiguration, CategoryServiceFactory, LogLevel} from 'typescript-logging';

CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Debug));
export const logger = new Category('product', new Category('app'));
export const baseAddress = 'https://uil8re1oja.execute-api.us-east-1.amazonaws.com/default';
