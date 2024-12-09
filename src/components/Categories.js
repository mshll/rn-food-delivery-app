import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/categories';
import categoryBetterImages from '../data/categoryBetterImages';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { useMemo, useState } from 'react';

const CategoryContent = ({ isLoading, isError, categories, selectedCategory, setSelectedCategory }) => (
  <>
    <View style={styles.header}>
      <Text style={styles.headerText}>Cuisines</Text>
    </View>
    {isLoading ? (
      <View style={{ flexDirection: 'row', paddingHorizontal: 16, gap: 10 }}>
        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={{ alignItems: 'center', gap: 5, margin: 5, paddingVertical: 10, paddingHorizontal: 15 }}>
            <Skeleton width={50} height={50} radius={14} colors={['rgba(76, 91, 74, 0.2)', 'rgba(76, 91, 74, 0.2)']} />
            <Skeleton width={60} height={20} radius={4} colors={['rgba(76, 91, 74, 0.2)', 'rgba(76, 91, 74, 0.2)']} />
          </View>
        ))}
      </View>
    ) : isError || !categories ? (
      <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        <Text style={[styles.text, { color: 'red' }]}>Error loading categories</Text>
      </View>
    ) : (
      <FlatList
        data={categories}
        renderItem={({ item, index }) => (
          <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: index * 100 }}>
            <TouchableOpacity onPress={() => setSelectedCategory(selectedCategory === item?.name ? null : item?.name)}>
              <View style={[styles.item, selectedCategory === item?.name && styles.selectedItem]}>
                <Image source={categoryBetterImages[item?.name] || { uri: item?.image }} style={styles.image} />
                <Text style={[styles.text, selectedCategory === item?.name && { color: '#d7e7d7' }]}>{item?.name || 'Unknown'}</Text>
              </View>
            </TouchableOpacity>
          </MotiView>
        )}
        keyExtractor={(item) => item?._id?.toString() || Math.random().toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    )}
  </>
);

const Categories = ({ setSelectedCategory, selectedCategory }) => {
  const [showContent, setShowContent] = useState(false);
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  // Create the container animation component once
  const AnimatedContainer = useMemo(
    () => (
      <MotiView
        from={{ translateY: -100 }}
        animate={{ translateY: 0 }}
        transition={{
          type: 'timing',
          duration: 300,
          delay: 0,
        }}
        onDidAnimate={(key, finished) => {
          if (key === 'translateY' && finished) {
            setShowContent(true);
          }
        }}
        style={styles.container}
      >
        <MotiView from={{ opacity: 0 }} animate={{ opacity: showContent ? 1 : 0 }} transition={{ type: 'timing', duration: 200 }}>
          <CategoryContent
            isLoading={isLoading}
            isError={isError}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </MotiView>
      </MotiView>
    ),
    [categories, isLoading, isError, selectedCategory, setSelectedCategory, showContent]
  );

  return AnimatedContainer;
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#d3e8d6',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderEndEndRadius: 20,
    borderEndStartRadius: 20,
    paddingBottom: 10,
  },
  header: {
    backgroundColor: '#d3e8d6',
    color: '#485c48',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 16,
  },
  headerText: {
    color: '#485c48',
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
  },
  item: {
    // marginHorizontal: 10,
    margin: 5,
    alignItems: 'center',
    // backgroundColor: '#222429',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    gap: 5,
  },
  text: {
    color: '#485c48',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 14,
  },
  headerSubText: {
    backgroundColor: '#1b1d21',
    color: '#d3e8d6',
    paddingHorizontal: 8,
    paddingVertical: 1,
    fontWeight: 'bold',
    fontSize: 24,
    borderRadius: 14,
    marginLeft: 10,
  },
  selectedItem: {
    backgroundColor: '#485c48',
    color: '#d7e7d7',
  },
});
