"use client"

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '@/next.config';
import { Post } from '@/types/post';
import { Tag } from '@/types/tag';

interface Props {
  children: ReactNode;
  posts: Post[];
  tags: Tag[];
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('ErrorBoundary caught an error', { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
