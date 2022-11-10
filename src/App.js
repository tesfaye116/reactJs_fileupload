import FileUploadComponent from "./components/FileUploadComponent";

function App() {
  return (
    <>
      <div className="flex  items-center justify-center max-h-screen mb-10">
        <h1 className="text-4xl  mt-48">
          <i className="fab fa-react flex-auto mr-5 text-cyan-500 rotate-45"></i>
          React FileUpload
        </h1>
      </div>
      <FileUploadComponent />
    </>
  );
}

export default App;