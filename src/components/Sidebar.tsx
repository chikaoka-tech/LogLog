import React from 'react';

const Sidebar = () => {
    return (
      <aside className="w-full md:w-1/3 flex flex-col items-center px-3">
        <div className="w-full bg-white shadow flex flex-col my-4 p-6">
          <p className="text-xl font-semibold pb-5 border-b mb-4">著者プロフィール</p>
          <img 
            className="rounded-full w-32 h-32 mx-auto mb-4 object-cover" 
            src="/profile.jpg" // 画像パスは適宜調整してください
            alt="著者近影"
          />
          <p className="text-sm pb-4">
            札幌を拠点に活動する美容師兼エンジニア。
            現在はSES企業に勤めながら、モダンなWeb技術を学習中。
            個人のポートフォリオサイト「LogLog」を開発しています。
          </p>
          <a href="#" className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4">
            詳細を見る
          </a>
        </div>
      </aside>
    );
  };
  
  export default Sidebar;
