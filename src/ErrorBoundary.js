import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 次回のレンダリングでフォールバックUIを表示するために状態を更新します
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // エラーレポートサービスにエラーをログします
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // フォールバックUIをカスタマイズできます
      return <h1>何かがおかしいようです。</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
