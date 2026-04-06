#include<stdio.h>
#include<stdlib.h>

struct node{
    int data;
    struct node * next;
};

struct node * PrintList(struct node * head){
    struct node * temp = head;

   do{
    printf("%d ",temp->data);
    temp = temp->next;
   }while(temp != head);
}

int main(){

    struct node * head;
    struct node * second;
    struct node * third;

    head = (struct node *)malloc(sizeof(struct node));
    second = (struct node *)malloc(sizeof(struct node));
    third = (struct node *)malloc(sizeof(struct node));

    head->data = 12;
    head->next = second;

    second->data = 23;
    second->next = third;

    third->data = 45;
    third->next = head;

    head = PrintList(head);
}