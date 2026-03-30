#include<stdio.h>
#include<stdlib.h>
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
    printf("\n");
}

struct node * InsertionAtBegin(struct node * head,int new_data){
    struct node * ptr = (struct node*)malloc(sizeof(struct node));
    ptr->next = head;
    ptr->data = new_data;
    return ptr;
}

struct node * InsertionAtBetween(struct node * head, int index,int value){
    struct node * temp = head;

    for(int i = 0; i < index; i++){
        temp = temp->next;
    }

    struct node * new_node = (struct node* )malloc(sizeof(struct node));
    new_node->data = value;
    new_node->next = temp->next;
    temp->next = new_node;

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

    printf("Original elements are : ");
    PrintElements(head);
    printf("After Insertion At Begin : ");
    head = InsertionAtBegin(head,56);
    PrintElements(head);
    printf("After Insertion At Between : ");
    InsertionAtBetween(head,2,25);
    PrintElements(head);

    return 0;
}