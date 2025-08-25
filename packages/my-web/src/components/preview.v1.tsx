'use client';

import { Caption, Title } from '@tekminewe/mint-ui/typography';
import { RichTextPreview } from '@tekminewe/mint-ui/rich-text-preview';
import dayjs from 'dayjs';
import Image from 'next/image';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FiShare } from 'react-icons/fi';
import { IconButton } from '@tekminewe/mint-ui/icon-button';
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuItem,
} from '@tekminewe/mint-ui/dropdown-menu';
import { FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PostDetailQuery } from '@/services/graphql';

interface PreviewV1Props {
  post: NonNullable<Required<PostDetailQuery>['post']>;
}

dayjs.extend(relativeTime);

export const PreviewV1 = ({ post }: PreviewV1Props) => {
  const [twitterShareUrl, setTwitterShareUrl] = useState('');

  useEffect(() => {
    setTwitterShareUrl(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${post.title}`,
      )}&url=${encodeURIComponent(window.location.href)}`,
    );
  }, [post.title]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  return (
    <div className="w-screen">
      <div className="max-w-[688px] my-8 mx-auto">
        <div className="relative px-2 md:px-0">
          <Title
            as="h1"
            className="[--font-size-8:calc(42px*var(--scaling))] [--heading-line-height-8:calc(52px*var(--scaling))] [--font-weight-bold:800]"
          >
            {post.title}
          </Title>
          <Caption>Published on {dayjs(post.postDate).fromNow()}</Caption>
          <br />

          <aside className="flex items-center gap-2 justify-end px-4 mt-4 sticky border-t border-b bg-background z-10 top-0 h-[3rem]">
            <DropdownMenuRoot>
              <DropdownMenuTrigger asChild>
                <IconButton variant="ghost">
                  <FiShare size={20} />
                </IconButton>
              </DropdownMenuTrigger>
              <DropdownMenu>
                <Link
                  href={twitterShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DropdownMenuItem>
                    <FaXTwitter /> Share on X
                  </DropdownMenuItem>
                </Link>
                {/* <DropdownMenuItem>
                    <FaLinkedinIn />
                    Share on Linkedin
                  </DropdownMenuItem> */}
              </DropdownMenu>
            </DropdownMenuRoot>
          </aside>
          <br />
          {post.featuredImage && (
            <Image
              priority
              src={post.featuredImage.url}
              width="688"
              height="361"
              className="mb-8"
              alt={post.title}
            />
          )}
          <RichTextPreview content={JSON.parse(post.content)} />
        </div>
      </div>
    </div>
  );
};
