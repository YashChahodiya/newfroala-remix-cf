import React from "react";

const FroalaEditorClient = React.lazy(
  () => import("../components/FroalaEditor.client")
);

const Index: React.FC = () => {
  return (
    <>
      <div className="bg-green-950 h-screen">
        <div className="text-4xl text-center text-gray-100 pt-14 ">
          <h1>Froala Editor .</h1>
        </div>
        <div className="justify-center justify-items-center  pt-24  content-center">
          <React.Suspense fallback={<div>Loading...</div>}>
            <FroalaEditorClient />
          </React.Suspense>
          <div className="justify-center justify-items-center"></div>
        </div>
      </div>
    </>
  );
};

export default Index;
