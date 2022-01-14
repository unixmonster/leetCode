
// Needed to make vscode not bitch about reassigning values.
export { };


// Definition for singly-linked list.
class ListNode {
      val: number
      next: ListNode | null
      constructor(val?: number, next?: ListNode | null) {
          this.val = (val===undefined ? 0 : val)
          this.next = (next===undefined ? null : next)
      }
  }


function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {

    // Easy edge cases
    if (!list1 && !list2) return null;
    if (list1 && !list2) return list1;
    if (!list1 && list2) return list2;

    if (list1.next === null && list2.next === null) {
        if (list1.val < list2.val) {
            list1.next = list2;
            return list1;
        } else {
            list2.next = list1;
            return list2;
        }
    }

    if (list1.next === null)

        // Establish cursor
        let cursor: ListNode = list1;

    // Find the end of the list
    while (cursor?.next !== null) {
        cursor = cursor.next;
    }

    // Append the lists together
    cursor.next = list2;

    // Reset cursor
    cursor = list1;
    let sortedPosition: ListNode = list1;

    // Sort full list
    while (cursor?.next !== null) {

        let nextItem: ListNode = cursor.next;

        if (cursor.val <= nextItem.val) {
            cursor = nextItem;
        } else {
            cursor.next = nextItem.next;
            nextItem.next = sortedPosition.next;
            sortedPosition.next = nextItem;
            cursor = sortedPosition;
        }
    }

    return list1;

};