import React, { useState } from "react";

const Blank: React.FC = () => {
  const [file, setFile] = useState<any>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(file);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" onChange={(e) => setFile(e.target.files)} />
        <button type="submit">Check</button>
      </form>
    </div>
  );
};

export default Blank;
