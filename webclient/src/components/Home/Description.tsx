import { MdOutlineMap } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Avatar, Box, Flex, Heading, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react';
import { ArrowForwardIcon, Icon, InfoOutlineIcon } from '@chakra-ui/icons';
import { OstNavLink } from '../Elements/OstLink';
import { OstButton } from '../Elements/OstButton';

type StepCardProps = {
  children: React.ReactNode;
  title: React.ReactNode;
  subTitle: string;
};

const StepCard = ({ children, title, subTitle }: StepCardProps) => {
  return (
    <Stack
      alignItems="left"
      borderRadius={8}
      textStyle="navigationLarge"
      background="white"
      // 各要素の幅を均等にするために指定
      width="100%"
    >
      <Stack background="#42667A" color="white" px={6} py={4} borderTopRadius={8}>
        <Text fontSize="md">{subTitle}</Text>
        <Heading size="md">{title}</Heading>
      </Stack>
      <Stack px={6} py={4}>
        {children}
      </Stack>
    </Stack>
  );
};

export const Description = () => {
  return (
    <>
      <Stack
        alignItems="left"
        px={6}
        py={6}
        my={6}
        borderRadius={8}
        spacing={4}
        textStyle="navigationLarge"
        background="white"
      >
        <Heading size="lg">このツールについて</Heading>
        <Text fontSize="md">
          オープンデータへの取組により、国民参加・官民協働の推進を通じた諸課題の解決、経済活性化、行政の高度化・効率化等が期待されています。
          しかし、自治体が公開しているオープンデータは増えてきているものの、機械判読性が高くフォーマットに沿った形で公開されているデータが少ないことが、活用する際の課題となっています。
          その課題を解決するため、データ作成のための支援ツールを開発しました。
        </Text>
        <Text fontSize="md">
          このツールでは、政府が公開している「推奨データセット」で指定されているものを対象とし、4つのステップでデータ内容を確認し修正を行います。
          全てのステップが完了するとマップが表示され、データが活用できる状態となっているか確認ができるツールとなっています。
        </Text>
        <Flex alignItems="center" px={6} py={4} bg={'information.bg.alert'} borderRadius={8}>
          <InfoOutlineIcon />
          <Text ml={6} fontSize="md">
            現在、試験段階（プロトタイプ）のため、「推奨データセット」の「公共施設一覧」にのみ対応しております。
          </Text>
        </Flex>
      </Stack>
      <Flex justifyContent="space-between" my={6} gap={6}>
        <StepCard
          title={
            <>
              CSVファイルを
              <br />
              アップロードします
            </>
          }
          subTitle="ステップ1"
        >
          <Text fontSize="md">ご自身のパソコンにある、CSVファイルをアップロードします。</Text>
          <Text fontSize="md" pt={4}>
            <b>ご注意ください</b>
          </Text>
          <Text fontSize="md">
            Excel（.xls/.xlsx）のファイルはアップロード対応していませんので、Excelファイルの場合はファイル形式を「CSV
            UTF-8(コンマ区切り)(.csv)」で保存した状態で、アップロードしてください。
          </Text>
        </StepCard>
        <StepCard
          title={
            <>
              データを
              <br />
              自動変換します
            </>
          }
          subTitle="ステップ2"
        >
          <Text fontSize="md">アップロードされたCSVデータを、自動変換します。</Text>
          <Box fontSize="md" pl={4}>
            <UnorderedList>
              <ListItem>文字コード</ListItem>
              <ListItem>半角全角</ListItem>
              <ListItem>必須項目の確認</ListItem>
            </UnorderedList>
          </Box>
          <Text fontSize="md">
            上記のデータチェックが自動で行われます。各変換のローディングが完了するまでお待ちください。
          </Text>
        </StepCard>
        <StepCard
          title={
            <>
              データ項目名を
              <br />
              整合させてください
            </>
          }
          subTitle="ステップ3"
        >
          <Text fontSize="md">
            政府が公開している「推奨データセット」のデータ項目名と整合させます。
          </Text>
          <Text fontSize="md">
            各項目名と、アップロードされたCSVの項目名が一致していることを確認してください。
          </Text>
          <Text fontSize="md">
            独自の項目として残す場合は、項目リストにチェックを入れてください。
          </Text>
        </StepCard>
        <StepCard
          title={
            <>
              データ形式を
              <br />
              確認してください
            </>
          }
          subTitle="ステップ4"
        >
          <Text fontSize="md">
            データ形式確認を行います。項目名別に、細かく修正ポイントが表示されます。
          </Text>
          <Text fontSize="md">修正が進むと、完了ボタンが押せるようになります。</Text>
          <Text fontSize="md">
            このステップまでに修正されたデータ（CSV）をダウンロードすることができるようになり、マップ表示が行えます。
          </Text>
        </StepCard>
      </Flex>
      <Flex justifyContent="center" my={6}>
        {/* NOTE: 見た目を塗りつぶしたボタンにするため、OstNavLinkではなくOstButtonを使用 */}
        <Link to="/upload-file">
          <OstButton size="L" view="button" iconRight={<Icon as={ArrowForwardIcon} w={6} h={6} />}>
            ステップ1からはじめる
          </OstButton>
        </Link>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        px={6}
        py={4}
        my={2}
        borderRadius={8}
        textStyle="navigationLarge"
        background="white"
      >
        <Stack alignItems="left">
          <Heading size="md">マップ表示のみ試したい方</Heading>
          <Text fontSize="md">
            作成されたデータ（CSV）をアップロードすることでマップ表示が行えます。
          </Text>
        </Stack>
        <OstNavLink
          to="/upload-file-for-map"
          iconRight={<Avatar size="md" p="12px" icon={<MdOutlineMap />} />}
          mr={8}
        >
          マップ表示を行ってみる
        </OstNavLink>
      </Flex>
    </>
  );
};
