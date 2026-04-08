#include<stdio.h>
#include<stdlib.h>

struct node
{
    int data;
    struct node * next;
};

void PrintElements(struct node * ptr){

    while(ptr != NULL){
        printf("%d ",ptr->data); 
        ptr = ptr->next;
    }
   printf("\n");
}
int  SearchingList(struct node * head, int key){

    struct node * temp = head;
    int position = 1;
    while(temp != NULL){
        if(temp->data == key){
            return position;
        }
        temp = temp->next;
        position++;
    }
    return -1;
}
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

    printf("Original Elements are : ");
    PrintElements(head);
    int key;
    printf("Enter key element : ");
    scanf("%d",&key);
    int position = SearchingList(head,key);

    if(position != -1){
        printf("Element %d found at index %d ",key,position);
    }
    else{
        printf("Element %d not found  ", key);
    }
}
