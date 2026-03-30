#include<stdio.h>
struct node
{
    int data;
    struct node*next;
};

struct node PrintElements(struct node * ptr){
    while (ptr != NULL)
    {
        printf("%d ",ptr->data);
        ptr =  ptr->next;
    }
    
}

int main(){
    struct node*head;
    struct node*second;
    struct node*third;

    head = (struct node*)malloc(sizeof(struct node));
    second = (struct node*)malloc(sizeof(struct node));
    third = (struct node*)malloc(sizeof(struct node));

    head->data = 12;
    head->next = second;

    second->data = 13;
    second->next = third;

    third->data = 14;
    third->next = NULL;

    PrintElements(head);
}