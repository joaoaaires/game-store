'use client'

import {
  ChevronDown,
  DollarSign,
  Timer,
  GalleryVerticalEnd,
  ChevronUp,
  Calendar,
  Star,
  ShoppingCart,
  Swords,
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import Category from '../game/core/category'
import ObjectResponse from '../shared/core/object-response'
import { api } from '@/lib/api'

export function FilterSideBar() {
  const [showPrice, setShowPrice] = useState<boolean>(false)
  const [showWhen, setShowWhen] = useState<boolean>(false)
  const [showGenre, setShowGenre] = useState<boolean>(false)
  const [categories, setCategories] = useState<Category[] | null | undefined>(
    [],
  )

  const fetchCategories = useCallback(async () => {
    const result = await api.get('/categories')
    const response: ObjectResponse<Category[]> = result.data
    setCategories(response.data)
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  function handlerShowPrice() {
    setShowPrice(!showPrice)
  }

  function handlerShowWhen() {
    setShowWhen(!showWhen)
  }

  function handlerShowGenre() {
    setShowGenre(!showGenre)
  }

  return (
    <div className="flex basis-1/6 flex-col gap-y-4 bg-gray-200 px-4 py-4">
      <div className="px-3 font-semibold uppercase">Filter Results</div>
      <button
        onClick={handlerShowPrice}
        type="button"
        className="flex justify-between rounded px-3 py-2 hover:bg-gray-500 hover:text-white"
      >
        <div className="flex gap-2">
          <DollarSign />
          <div className="font-bold">Price</div>
        </div>
        {showPrice ? <ChevronUp /> : <ChevronDown />}
      </button>
      <div
        className={`${showPrice ? 'flex' : 'hidden'}  flex-col gap-y-3 px-5`}
      >
        <button className="flex gap-2">
          <Star /> Free
        </button>
        <button className="flex gap-2">
          <Star /> On Sale
        </button>
        <button className="flex gap-2">
          <ShoppingCart /> On Sale
        </button>
        <button className="flex gap-2">
          <ShoppingCart /> On Sale
        </button>
        <button className="flex gap-2">
          <ShoppingCart /> On Sale
        </button>
      </div>
      <button
        onClick={handlerShowWhen}
        type="button"
        className="flex justify-between rounded px-3 py-2 hover:bg-gray-500 hover:text-white"
      >
        <div className="flex gap-2">
          <Calendar />
          <div className="font-bold">When</div>
        </div>
        {showWhen ? <ChevronUp /> : <ChevronDown />}
      </button>
      <div className={`${showWhen ? 'flex' : 'hidden'}  flex-col gap-y-3 px-5`}>
        <button className="flex gap-2">
          <Timer />
          Last Day
        </button>
        <button className="flex gap-2">
          <Timer />
          Last 7 days
        </button>
        <button className="flex gap-2">
          <Timer />
          Last 30 days
        </button>
      </div>
      <button
        onClick={handlerShowGenre}
        type="button"
        className="flex justify-between rounded px-3 py-2 hover:bg-gray-500 hover:text-white"
      >
        <div className="flex gap-2">
          <GalleryVerticalEnd />
          <div className="font-bold">Genre</div>
        </div>
        {showGenre ? <ChevronUp /> : <ChevronDown />}
      </button>
      <div
        className={`${showGenre ? 'flex' : 'hidden'}  flex-col gap-y-3 px-5`}
      >
        {categories &&
          categories.map((category) => (
            <button className="flex gap-2" key={category.id}>
              <Swords />
              {category.description}
            </button>
          ))}
      </div>
    </div>
  )
}
