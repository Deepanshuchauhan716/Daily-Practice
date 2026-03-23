#include<stdio.h>

int BinarySearch(int arr[],int key,int left,int right){

     

     while (left <= right)
     {
        int mid = left + (right - left) / 2;

       if(arr[mid] == key){
        return mid;
       }
       if(key > arr[mid]){
        left = mid + 1;
       }
       if(key < arr[mid]){
        right = mid - 1;
       }
       
     }
      return -1;

}
int main(){

    int arr[12] = {12,23,45,67};
    int n = 4;
    int key;

    printf("Enter element : ");
    scanf("%d",&key);

    int result = BinarySearch(arr,key, 0, n - 1);

    if(result != -1){
        printf("Element %d found at %d index",key,result);
    }else{
        printf("Element %d not found",key);
    }
    return 0;
}