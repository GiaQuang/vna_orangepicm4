"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Home() {
  const [showStudentList, setShowStudentList] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [showLogoUpload, setShowLogoUpload] = useState(false);
  const [logo, setLogo] = useState("/Logo.png");
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 14;
  const totalStudents = 30;

  useEffect(() => {
    const storedLogo = localStorage.getItem("logo");
    if (storedLogo) {
      setLogo(storedLogo);
    }
  }, []);

  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  const toggleSubmenu = () => {
    setShowSubmenu((prev) => !prev);
  };

  const handleStudentListClick = () => {
    setShowStudentList(true);
  };

  const handleCheckboxChange = (index) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(index)) {
      newSelectedItems.delete(index);
    } else {
      newSelectedItems.add(index);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleSelectAll = (e) => {
    const totalRows = 30;
    if (e.target.checked) {
      setSelectedItems(
        new Set(Array.from({ length: totalRows }, (_, i) => i + 1))
      );
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setLogo(base64Image);
        setSelectedFile(file);
        localStorage.setItem("logo", base64Image);

        toast.success("Đã tải logo thành công!", {
          position: "top-right",
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSelectedItems(new Set());
  };

  const renderPagination = () => (
    <div className="flex justify-end space-x-2 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
        className={`px-2 py-1 border ${
          currentPage === 1 ? "text-gray-400" : "text-blue-500"
        }`}
      >
        {"<<"}
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`px-2 py-1 border ${
          currentPage === 1 ? "text-gray-400" : "text-blue-500"
        }`}
      >
        {"<"}
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-2 py-1 border ${
            page === currentPage ? "bg-blue-500 text-white" : "text-blue-500"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`px-2 py-1 border ${
          currentPage === totalPages ? "text-gray-400" : "text-blue-500"
        }`}
      >
        {">"}
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
        className={`px-2 py-1 border ${
          currentPage === totalPages ? "text-gray-400" : "text-blue-500"
        }`}
      >
        {">>"}
      </button>
    </div>
  );

  const currentStudents = Array.from({ length: studentsPerPage }, (_, i) => {
    const studentIndex = (currentPage - 1) * studentsPerPage + i;
    return studentIndex < totalStudents ? studentIndex + 1 : null;
  });

  return (
    <motion.div
      className="min-h-screen flex select-none bg-gray-100"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "mass", stiffness: 100 }}
    >
      {/* Sidebar */}
      <aside className="w-[220px] bg-gray-200 p-4">
        <div className="w-[200px] h-[90px] relative">
          <Image
            src={logo}
            alt="Logo"
            width={200}
            height={90}
            className="object-contain max-w-full max-h-full"
          />
        </div>

        <div className="flex flex-col">
          <nav className="mt-8 font-bold">
            <ul className="space-y-4">
              <li>
                <button
                  onClick={handleStudentListClick}
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
                        className="hover:text-red-500 transition-opacity duration-300 opacity-70 hover:opacity-100 font-bold"
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        {showStudentList ? (
          <div className="p-4">
            <h2 className="text-3xl font-bold mb-4 text-black text-center">
              DANH SÁCH HỌC VIÊN
            </h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200 text-black">
                <tr>
                  <th className="border border-gray-300 ">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedItems.size === currentStudents.length}
                    />
                  </th>
                  <th className="border border-gray-300 ">STT</th>
                  <th className="border border-gray-300 ">Họ Và Tên</th>
                  <th className="border border-gray-300 ">Giới Tính</th>
                  <th className="border border-gray-300 ">Tỉnh Thành</th>
                  <th className="border border-gray-300 ">Phân Loại</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((index, rowIndex) => (
                  <tr key={rowIndex} className="text-center text-black">
                    <td className="border border-gray-300 ">
                      {index !== null && (
                        <input
                          type="checkbox"
                          checked={selectedItems.has(index)}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      )}
                    </td>
                    <td className="border border-gray-300 ">
                      {index !== null ? index : ""}
                    </td>
                    <td className="border border-gray-300 ">
                      {index !== null ? `Học viên ${index}` : ""}
                    </td>
                    <td className="border border-gray-300 ">
                      {index !== null ? (
                        <span
                          className={`inline-block  rounded-full text-white text-center ${
                            index % 2 === 0 ? "bg-blue-500" : "bg-pink-500"
                          } w-20`}
                        >
                          {index % 2 === 0 ? "Nam" : "Nữ"}
                        </span>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="border border-gray-300 ">
                      {index !== null ? `Tỉnh ${index}` : ""}
                    </td>
                    <td className="border border-gray-300 ">
                      {index !== null ? (
                        <span
                          className={`inline-block  rounded-full text-white text-center ${
                            index % 2 === 0 ? "bg-green-500" : "bg-red-500"
                          } w-40`}
                        >
                          {index % 2 === 0 ? "RFID" : "Vân tay"}
                        </span>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {renderPagination()}
            <div className="flex justify-between mt-4">
              <div className="flex space-x-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() =>
                    toast.success(
                      "VUI LÒNG QUÉT THẺ HOẶC THÊM VÂN TAY ĐỂ THÊM HỌC VIÊN",
                      {
                        position: "top-right",
                        style: {
                          backgroundColor: "orange",
                          color: "white",
                        },
                      }
                    )
                  }
                >
                  Thêm Học Viên
                </button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Sửa Thông Tin
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Xóa Học Viên
                </button>
              </div>

              <div className="flex items-center">
                <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                  Lưu Thông Tin
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute top-32 w-full text-center text-[60px] text-red-500 font-bold">
            Chào Mừng Bạn!
          </div>
        )}
      </main>
    </motion.div>
  );
}
