import { PostSortEnum, PostTypeEnum } from '@/constants/types/posts';
import {
  useCreateAnswer,
  useDeleteAnswer,
  useUpdateAnswer,
} from '@/reactQuery/mutations/answers';
import { useLogin } from '@/reactQuery/mutations/auth';
import {
  useCreateQuestion,
  useDeleteQuestion,
  useUpdateQuestion,
} from '@/reactQuery/mutations/questions';
import { useDeleteScrap, useScrapPost } from '@/reactQuery/mutations/scraps';
import { useJoin, useUpdateTestResult } from '@/reactQuery/mutations/users';
import { useGetAnswer } from '@/reactQuery/queries/answers';
import {
  useGetPostDetail,
  useGetPosts,
  useGetTodayInfo,
} from '@/reactQuery/queries/posts';
import { useGetQuestions } from '@/reactQuery/queries/questions';
import { useGetScraps, useGetTests } from '@/reactQuery/queries/scraps';
import { useGetUserInfo } from '@/reactQuery/queries/users';

export default function Home() {
  const { posts } = useGetPosts({
    postType: PostTypeEnum.SPACING,
    sort: PostSortEnum.CREATED_AT,
    page: 1,
  });
  const { today } = useGetTodayInfo();
  const { detail } = useGetPostDetail({ postId: 1 });
  const { createQuestion } = useCreateQuestion();
  const { join } = useJoin();
  const { login, loginResult } = useLogin();
  const { userInfo } = useGetUserInfo();
  const { questions } = useGetQuestions({ page: 1 });
  const { updateTestResult } = useUpdateTestResult();
  const { updateQuestion } = useUpdateQuestion();
  const { deleteQuestion } = useDeleteQuestion();
  const { answer } = useGetAnswer({ answerId: 9 });
  const { createAnswer } = useCreateAnswer();
  const { updateAnswer } = useUpdateAnswer();
  const { deleteAnswer } = useDeleteAnswer();
  const { scraps } = useGetScraps();
  const { tests } = useGetTests();
  const { scrapPost } = useScrapPost();
  const { deleteScrap } = useDeleteScrap();

  const handleJoin = () => {
    join({
      email: '',
      passwd: '',
      nickname: '',
    });
  };
  const handleLogin = () => {
    login({
      email: '',
      passwd: '',
    });
  };
  const handleSubmit = () => {
    createQuestion({
      title: '제목',
      content: '내용',
    });
  };
  const handleUpdateTestResult = () => {
    updateTestResult({ plusPoint: 3 });
  };
  const handleUpdateQuestion = () => {
    updateQuestion({
      questionId: 7,
      inputs: {
        title: '제목1',
        content: '내용1',
      },
    });
  };
  const handleDeleteQuestion = () => {
    deleteQuestion({
      questionId: 7,
    });
  };
  const handleCreateAnswer = () => {
    createAnswer({
      questionId: 5,
      content: '답변입니다',
    });
  };
  const handleUpdateAnswer = () => {
    updateAnswer({
      answerId: 9,
      content: '수정답변',
    });
    console.log(answer);
  };
  const handleDeleteDeleteAnswer = () => {
    deleteAnswer({
      answerId: 9,
    });
  };
  const handleScrapPost = () => {
    scrapPost({
      postId: 4,
    });
  };
  const handleDeleteScrap = () => {
    deleteScrap({
      postId: 4,
    });
  };

  return (
    <>
      home!
      <button onClick={handleJoin}>join</button>
      <button onClick={handleLogin}>login</button>
      <button onClick={handleSubmit}>create question</button>
      <button onClick={handleUpdateTestResult}>updateTestResult</button>
      <button onClick={handleUpdateQuestion}>UpdateQuestion</button>
      <button onClick={handleDeleteQuestion}>deleteQuestion</button>
      <button onClick={handleCreateAnswer}>handleCreateAnswer</button>
      <button onClick={handleUpdateAnswer}>handleUpdateAnswer</button>
      <button onClick={handleDeleteDeleteAnswer}>
        handleDeleteDeleteAnswer
      </button>
      <button onClick={handleScrapPost}>handleScrapPost</button>
      <button onClick={handleDeleteScrap}>handleDeleteScrap</button>
    </>
  );
}
