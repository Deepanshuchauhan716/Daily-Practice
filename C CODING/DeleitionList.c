#include<stdio.h>
#include<stdlib.h>
struct node
{
   int data;
   struct node * next;
};

struct node PrintElements(struct node *ptr)
{
    while (ptr != NULL)
    {
        printf("%d ", ptr->data);
        ptr = ptr->next;
    }
    printf("\n");
}

struct node * DeletionAtBegin(struct node *head){
    struct node * temp = head;
    head = head->next;

    free(temp);
    return head;
}

struct node * DeletionAtBetween(int index,struct node * head){

    struct node * temp = head;

    for(int i = 0; i < index - 1; i++){
        temp = temp->next;
    }

    struct node * del = temp->next;

    temp->next = del->next;

    free(del);

    return head;


}

int main(){
    struct node * head;
    struct node * second;
    struct node * third;
    struct node * fourth;

    head = (struct node * )malloc(sizeof(struct node));
    second = (struct node * )malloc(sizeof(struct node));
    third = (struct node * )malloc(sizeof(struct node));
    fourth = (struct node * )malloc(sizeof(struct node));

    head->data = 12;
    head->next = second;

    second->data = 13;
    second->next = third;

    third->data = 14;
    third->next = fourth;

    fourth->data = 15;
    fourth->next = NULL;

    printf("original elements : ");
    PrintElements(head);
    printf("After Deletion at begin : ");
    head = DeletionAtBegin(head);
    PrintElements(head);
    printf("after deletion : ");
    head = DeletionAtBetween(2,head);
    PrintElements(head);
}