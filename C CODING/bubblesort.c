#include<stdio.h>

void OriginalArray(int arr[],int n){

    for(int i = 0; i < n; i++){
        printf("%d ",arr[i]);
    }
}
int main(){

    int arr[] = {12,34,56,78,67};
    int n = sizeof(arr) / sizeof(arr[0]); 

    printf("original Array");
    OriginalArray(arr,n);
}