import { PaginationData } from "@/models/global";
import Image from "next/image";
import Link from "next/link";

export default function Pagination({
    page,
    data,
    route,
}: {
    page: number;
    data: PaginationData;
    route: string;
}) {
    return (
        <>
            <Link
                href={`${
                    data.has_previous_page
                        ? `/${route}?page=${
                              data.current_page <= 1 ? 1 : data.current_page - 1
                          }`
                        : "#"
                }`}
                onClick={(e) => !data.has_previous_page && e.preventDefault()}
                className={`rounded-full bg-secondary w-10 h-10 flex items-center justify-center  ${
                    !data.has_previous_page
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-tertiary"
                }`}
            >
                <Image
                    src="/previous.svg"
                    alt="previous"
                    width={8}
                    height={8}
                    className="p-3"
                    style={{ width: "auto", height: "100%" }}
                />
            </Link>

            {data.last_visible_page <= 5
                ? [...Array(data.last_visible_page)].map((_, i) => (
                      <Link
                          href={`/${route}?page=${i + 1}`}
                          key={i}
                          className={`${
                              page === i + 1 ? "text-yellow-600" : "text-black"
                          } rounded-full bg-secondary w-10 h-10 flex items-center justify-center`}
                      >
                          {i + 1}
                      </Link>
                  ))
                : page <= 4
                ? [...Array(5)].map((_, i) => (
                      <Link
                          href={`/${route}?page=${i + 1}`}
                          key={i}
                          className={`${
                              page === i + 1 ? "text-yellow-600" : "text-black"
                          } rounded-full bg-secondary w-10 h-10 flex items-center justify-center`}
                      >
                          {i + 1}
                      </Link>
                  ))
                : page >= data.last_visible_page - 3
                ? [...Array(5)].map((_, i) => {
                      const pageNumber = data.last_visible_page - 4 + i;
                      return (
                          <Link
                              href={`/${route}?page=${pageNumber}`}
                              key={pageNumber}
                              className={`${
                                  page === pageNumber
                                      ? "text-yellow-600"
                                      : "text-black"
                              } rounded-full bg-secondary w-10 h-10 flex items-center justify-center`}
                          >
                              {pageNumber}
                          </Link>
                      );
                  })
                : [...Array(7)].map((_, i) =>
                      i === 0 ? (
                          <Link
                              href={`/${route}?page=1`}
                              key={i}
                              className="rounded-full bg-secondary w-10 h-10 flex items-center justify-center"
                          >
                              1
                          </Link>
                      ) : i === 6 ? (
                          <Link
                              href={`/${route}?page=${data.last_visible_page}`}
                              key={i}
                              className="rounded-full bg-secondary w-10 h-10 flex items-center justify-center"
                          >
                              {data.last_visible_page}
                          </Link>
                      ) : i === 1 ? (
                          <Link
                              href={`/${route}?page=${
                                  page - 5 <= 1 ? 1 : page - 5
                              }`}
                              key={i}
                              className="rounded-full bg-secondary w-10 h-10 flex items-center justify-center"
                          >
                              ...
                          </Link>
                      ) : i === 5 ? (
                          <Link
                              href={`/${route}?page=${
                                  page + 5 >= data.last_visible_page
                                      ? data.last_visible_page
                                      : page + 5
                              }`}
                              className="rounded-full bg-secondary w-10 h-10 flex items-center justify-center"
                              key={i}
                          >
                              ...
                          </Link>
                      ) : (
                          <Link
                              href={`/${route}?page=${page + i - 3}`}
                              key={i}
                              className={`${
                                  page === page + i - 3
                                      ? "text-yellow-600"
                                      : "text-black"
                              } rounded-full bg-secondary w-10 h-10 flex items-center justify-center`}
                          >
                              {page + i - 3}
                          </Link>
                      )
                  )}

            <Link
                href={`${
                    data.has_next_page
                        ? `/${route}?page=${
                              page >= data.last_visible_page
                                  ? data.last_visible_page
                                  : data.current_page + 1
                          }`
                        : "#"
                }`}
                onClick={(e) => !data.has_next_page && e.preventDefault()}
                className={`rounded-full bg-secondary w-10 h-10 flex items-center justify-center  ${
                    !data.has_next_page
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-tertiary"
                }`}
            >
                <Image
                    src="/next.svg"
                    alt="next"
                    width={8}
                    height={8}
                    className="p-3"
                    style={{ width: "auto", height: "100%" }}
                />
            </Link>
        </>
    );
}
