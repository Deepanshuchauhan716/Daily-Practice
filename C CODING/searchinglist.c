#include<stdio.h>
#include<stdlib.h>

struct node
{
    int data;
    struct node * next;
};

int main(){

    struct node * head;
    struct node * second;
    struct node * third;
    struct node * forth;

    head = (struct node * )malloc(sizeof(struct node));
    second = (struct node * )malloc(sizeof(struct node));
    third = (struct node * )malloc(sizeof(struct node));
    forth = (struct node * )malloc(sizeof(struct node));

    head->data = 12;
    head->next = second;

    second->data = 13;
    second->next = third;

    third->data = 14;
    third->next = forth;

    forth->data = 15;
    forth->next = NULL;
}
