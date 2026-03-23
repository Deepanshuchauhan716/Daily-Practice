#include<stdio.h>

int BinarySearch(int arr[],int key,int left,int right){

     int mid = left + (right - left) / 2;

     while (left <= right)
     {
       if(arr[mid]== key){
        return mid;
       }
       if(key > arr[mid]){
        left = mid + 1;
       }
       if(key < arr[mid]){
        right = mid - 1;
       }
        return -1;
     }
     

}
int main(){

    int arr[12] = {12,23,45,67};
    int n = 4;
    int key;

    int result = BinarySearch(arr,45, 0, n - 1);
    return 0;
}