export type TCurrentSellingItem = {
    Name: string,
    createdAt: string,
    id: string,
    price: number,
    quantity: number,
    type: string
};

export type TSellItem = {
    Name: string,
    createdAt: string,
    id: string,
    price: number,
    quantity: number,
};

export type TsellItemSelling = {
    Name: string,
    createdAt: string,
    id: string,
    price: number,
    quantity: number,
    type: string
};

export enum saleStatus {
    MY = 'My',
    SALESMAN ='salesman',
    SALE = 'sale'
}