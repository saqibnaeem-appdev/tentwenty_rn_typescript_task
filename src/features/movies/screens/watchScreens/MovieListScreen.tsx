import { View, StyleSheet, BackHandler, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/movie/SearchBar';
import { colors } from '@/theme';
import MainFlatList from '@/components/list/MainFlatlist';
import CategoryGrid from '@/components/movie/CategoryGrid';
import SearchResults from '@/components/movie/SearchResults';

import { useSearchMovies } from '@/features/movies';
import { SafeAreaView } from 'react-native-safe-area-context';

const MovieListScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { data, isLoading } = useSearchMovies(debouncedQuery);
  const results = data?.results;
  const resultsCount = results?.length || 0;

  useEffect(() => {
    const backAction = () => {
      if (isSubmitted) {
        setIsSubmitted(false);
        return true;
      }
      if (isSearching) {
        handleCloseSearch();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [isSearching, isSubmitted]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (isSubmitted) setIsSubmitted(false);
  };

  const handleSearchSubmit = () => {
    Keyboard.dismiss();
    setIsSubmitted(true);
  };

  const handleCloseSearch = () => {
    setSearchQuery('');
    setDebouncedQuery('');
    setIsSearching(false);
    setIsSubmitted(false);
  };

  const handleClearText = () => {
    if (searchQuery.length === 0) {
      handleCloseSearch();
    } else {
      setSearchQuery('');
      setDebouncedQuery('');
      setIsSubmitted(false);
    }
  };

  const handleBackFromResults = () => {
    setIsSubmitted(false);
  };

  const renderContent = () => {
    if (isSubmitted) {
      return <SearchResults movies={results} isLoading={isLoading} />;
    }

    if (!isSearching) {
      return <MainFlatList />;
    }

    if (searchQuery.length === 0) {
      return <CategoryGrid onSelectGenre={genre => setSearchQuery(genre)} />;
    }

    return (
      <SearchResults movies={results} isLoading={isLoading} isShowingResult />
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.white }}
      edges={['top']}
    >
      <View style={styles.screenContainer}>
        <SearchBar
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          value={searchQuery}
          onChangeText={handleSearchChange}
          onClear={handleClearText}
          onClose={handleCloseSearch}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
          isSubmitted={isSubmitted}
          onBack={handleBackFromResults}
          resultsCount={resultsCount}
        />
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

export default MovieListScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
