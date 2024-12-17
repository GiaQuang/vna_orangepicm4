import { useState } from "react";

export default function Sidebar() {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showLogoUpload, setShowLogoUpload] = useState(false); // Trạng thái hiển thị phần upload logo
  const [selectedFile, setSelectedFile] = useState(null); // Trạng thái lưu tệp hình ảnh được chọn

  const toggleSubmenu = () => {
    setShowSubmenu((prev) => !prev);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <aside className="w-[220px] bg-gray-200 p-4">
      <div className="flex flex-col">
        <nav className="mt-8 font-bold">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setShowLogoUpload(false)}
                className="text-gray-700 hover:text-red-500 focus:outline-none w-full text-left transition-opacity duration-300 opacity-70 hover:opacity-100"
              >
                DANH SÁCH HỌC VIÊN
              </button>
            </li>
            <li>
              <button
                onClick={toggleSubmenu}
                className="text-gray-700 hover:text-red-500 focus:outline-none w-full text-left transition-opacity duration-300 opacity-70 hover:opacity-100"
              >
                CÀI ĐẶT
              </button>
              {showSubmenu && (
                <ul className="mt-2 ml-4 space-y-2 font-normal text-gray-600">
                  <li>
                    <button
                      onClick={() => setShowLogoUpload(!showLogoUpload)}
                      className="hover:text-red-500 transition-opacity duration-300 opacity-70 hover:opacity-100"
                    >
                      Logo
                    </button>
                    {showLogoUpload && (
                      <div className="mt-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="border border-gray-300 p-2"
                        />
                        {selectedFile && (
                          <p className="mt-2 text-sm text-gray-600">
                            Tệp đã chọn: {selectedFile.name}
                          </p>
                        )}
                      </div>
                    )}
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
