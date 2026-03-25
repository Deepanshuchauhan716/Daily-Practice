#include<stdio.h>

void OriginalArray(int arr[],int n){

    for(int i = 0; i < n; i++){
        printf("%d ",arr[i]);
    }
    printf("\n");
}

void BubbleSort(int arr[],int n){
    for(int i = 0; i < n - 1; i++){
        for(int j = 0; j < n - i - 1; i++){
            if(arr[j] > arr[j + 1]){
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
int main(){

    int arr[] = {12,34,56,78,67};
    int n = sizeof(arr) / sizeof(arr[0]); 

    printf("original Array");
    OriginalArray(arr,n);
    BubbleSort(arr,n);
}