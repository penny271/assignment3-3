'use strict';

{
   const addTaskTrigger = document.getElementById('addBtn');
   const addTaskTarget = document.getElementById('addTaskTarget');
   const input = document.getElementById('input');

   let idNum = 0;

   let tasks = [];
   //追加ボタンクリック時の詳細な挙動
   const addTask = () => {
      let task = {
         id: idNum,
         comment: input.value,

         // conditionWorking: '作業中',
         // conditionDelete: '削除',
      };

      tasks.push(task);
      //結果ブラウザ上に表示させる
      displayTasks();
   };

   //todoのタスクを作成及び結果をブラウザに表示
   const displayTasks = () => {
      //¥初期化処理 - ここでブラウザに表示されるtrを
      //¥全て削除することで画面上タスクを見えなくする
      document.querySelectorAll('.addedTr').forEach((tr) => {
         tr.remove();
      });
      tasks.forEach((each, index) => {
         const tr = document.createElement('tr');
         tr.classList.add('addedTr');
         const idTd = document.createElement('td');
         const commentTd = document.createElement('td');
         const conditionWorkingTd = document.createElement('td');
         const conditionCompleteTd = document.createElement('td'); //¥NEW
         const conditionDeleteTd = document.createElement('td');
         conditionWorkingTd.classList.add('btn');
         conditionCompleteTd.classList.add('btn', 'hidden'); //¥NEW
         conditionDeleteTd.classList.add('btn', 'delete');
         // const getRemoveBtn = document.getElementsByClassName('delete'); //¥NEW

         //¥削除機能:削除ボタンが押された時に押された要素を削除する
         conditionDeleteTd.addEventListener('click', () => {
            tasks.splice(index, 1);
            displayTasks();
            //return;
         });

         //^作業中、削除ボタンを押したときにタスクの状態を変える
         conditionWorkingTd.addEventListener('click', () => {
            conditionWorkingTd.classList.add('hidden');
            conditionCompleteTd.classList.remove('hidden');
         });

         conditionCompleteTd.addEventListener('click', () => {
            conditionWorkingTd.classList.remove('hidden');
            conditionCompleteTd.classList.add('hidden');
         });

         addTaskTarget.appendChild(tr);
         tr.appendChild(idTd); // 1つめ
         // idTd.textContent = tasks[index].id;
         idTd.textContent = index;
         tr.appendChild(commentTd); // 2つ目
         commentTd.textContent = tasks[index].comment; // タスク入力値
         tr.appendChild(conditionWorkingTd); // 3つ目
         conditionWorkingTd.textContent = '作業中';
         //! ※2つ目の3つ目- .hiddenで初期状態では不可視
         tr.appendChild(conditionCompleteTd);// 3つ目※
         conditionCompleteTd.textContent = '完了';
         tr.appendChild(conditionDeleteTd); // 4つ目
         conditionDeleteTd.textContent = '削除';

         const numOfTasks = addTaskTarget.childElementCount;
      });
   };

   //追加ボタンクリック時にaddTask()を走らせる
   addTaskTrigger.addEventListener('click', () => {
      addTask();
      input.value = '';
   });
}
