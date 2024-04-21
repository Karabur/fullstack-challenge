'use client'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { DateTime } from 'luxon'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import JsonView from 'react18-json-view'
import getChanges, { Change } from '../../api/get-changes'
import 'react18-json-view/src/style.css'

export default function ChangeList() {
  const [changes, setChanges] = useState<Change[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<Set<number>>(new Set())
  const router = useRouter()

  const expand = useCallback((id: number) => {
    setExpanded((prev) => new Set(prev.add(id)))
  }, [])
  const collapse = useCallback((id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    getChanges()
      .then((changes) => {
        setChanges(changes)
        setLoading(false)
      })
      .catch(() => {
        //todo: check for 401 error specifically
        router.push('/login')
      })
  }, [router])

  if (loading) return <p className="text-center text-blue-500">Loading...</p>

  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Medical Record Changes</h1>
      <div className="w-full">
        {changes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Change</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Data</th>
                </tr>
              </thead>
              <tbody>
                {changes.map((record, index) => (
                  <>
                    <tr
                      key={index}
                      className={clsx('border-b', {
                        'border-b-gray-50': expanded.has(record.id),
                      })}
                    >
                      <td className="py-2 px-4">
                        {DateTime.fromISO(record.createdAt).toFormat('yyyy-MM-dd HH:mm:ss')}
                      </td>
                      <td className="py-2 px-4">{record.user.name}</td>
                      <td
                        className={clsx('py-2 px-4', {
                          'text-green-600': record.type === 'Create',
                          'text-red-600': record.type === 'Delete',
                          'text-blue-600': record.type === 'Update',
                        })}
                      >
                        {record.type}
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              expanded.has(record.id) ? collapse(record.id) : expand(record.id)
                            }
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {expanded.has(record.id) ? (
                              <EyeSlashIcon className="h-6 w-6" />
                            ) : (
                              <EyeIcon className="h-6 w-6" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className={clsx({ hidden: !expanded.has(record.id) })}>
                      <td colSpan={4} className="py-2 px-4 border-b">
                        <div className="flex gap-2 items-stretch">
                          <div className="flex-1 flex flex-col">
                            <h3>Old data</h3>
                            <div className="my-2 p-1 rounded-xl bg-amber-50 flex-1">
                              {record.oldData ? <JsonView src={record.oldData} /> : 'N/A'}
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col">
                            <h3 className="flex-grow-0">New data</h3>
                            <div className="my-2 p-1 rounded-xl bg-amber-50 flex-1">
                              {record.data ? <JsonView src={record.data} /> : 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center">No changes found.</p>
        )}
      </div>
    </div>
  )
}
