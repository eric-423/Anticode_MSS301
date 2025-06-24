import React, { useState } from 'react'

const ProductNavigation = () => {
  const ChevronRightIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-gray-500"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  )

  const [activeCategory, setActiveCategory] = useState('Đồ Ăn Kèm')

  const breadcrumbs = [
    { label: 'Trang chủ', href: '#' },
    { label: 'Sản phẩm', href: '#' },
    { label: 'Đồ Ăn Kèm', href: '#', isCurrent: true },
  ]

  const categories = [{ id: 'food', label: 'Đồ Ăn Kèm' }]

  return (
    <div className="font-sans p-4 md:p-8 bg-white">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-1 text-sm text-gray-500">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && '/'}
              <a
                href={crumb.href}
                className={`ml-1 ${
                  crumb.isCurrent
                    ? 'font-semibold text-gray-800'
                    : 'hover:text-gray-700 hover:underline'
                }`}
                aria-current={crumb.isCurrent ? 'page' : undefined}
              >
                {crumb.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="flex items-center">
        <div className="flex items-center mr-6">
          <span className="inline-block w-1 h-6 bg-blue-600 mr-3"></span>
          <h2 className="text-xl font-semibold text-gray-800">SẢN PHẨM</h2>
        </div>

        <div className="flex space-x-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`pb-2 text-lg font-medium transition-colors duration-150
                ${
                  activeCategory === category.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductNavigation
